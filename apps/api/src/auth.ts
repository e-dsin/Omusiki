import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { prisma, upsertViewer } from "@omusiki/db";
import type { Role } from "@omusiki/types";

export interface AuthedRequest extends Request {
  viewer?: {
    id: string;
    providerUserId: string;
    email: string;
    name: string;
    role: Role;
  };
}

const roles: Role[] = ["SUBSCRIBER", "ARTIST", "ADMIN"];

function devSecret() {
  return process.env.DEV_AUTH_SECRET || "dev-only-change-me";
}

function asRole(value: unknown): Role | undefined {
  return roles.includes(value as Role) ? (value as Role) : undefined;
}

export function firebaseAdminAuth() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;
  if (!getApps().length) {
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getAuth();
}

export function signDevToken(input: {
  providerUserId: string;
  email: string;
  name: string;
  role: Role;
}) {
  return jwt.sign({ ...input, sub: input.providerUserId }, devSecret(), {
    expiresIn: "7d",
    issuer: "omusiki-dev",
  });
}

async function identityFromToken(token: string) {
  const adminAuth = firebaseAdminAuth();
  if (adminAuth) {
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      const role = asRole(decoded.role);
      return {
        providerUserId: decoded.uid,
        email: decoded.email || `${decoded.uid}@users.firebase`,
        name: decoded.name || decoded.email || "Abonné",
        role,
        syncRole: Boolean(role),
      };
    } catch {
      if (process.env.ALLOW_DEV_AUTH !== "true") throw new Error("Invalid session");
    }
  }
  if (process.env.ALLOW_DEV_AUTH === "true") {
    const payload = jwt.verify(token, devSecret()) as jwt.JwtPayload;
    if (payload.iss !== "omusiki-dev") throw new Error("Invalid session");
    return {
      providerUserId: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name),
      role: asRole(payload.role),
      syncRole: false,
    };
  }
  throw new Error("Invalid session");
}

export async function requireViewer(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.header("authorization");
    const token = header?.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return res.status(401).json({ message: "Sign in required" });
    const identity = await identityFromToken(token);
    const user = await upsertViewer(identity);
    req.viewer = {
      id: user.id,
      providerUserId: user.providerUserId,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    next();
  } catch {
    res.status(401).json({ message: "Invalid session" });
  }
}

export function requireRole(role: Role) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.viewer) return res.status(401).json({ message: "Sign in required" });
    if (req.viewer.role !== role && req.viewer.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

export async function optionalViewer(req: AuthedRequest, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return next();
  try {
    const identity = await identityFromToken(token);
    const user = await prisma.user.findUnique({ where: { providerUserId: identity.providerUserId } });
    if (user) {
      req.viewer = {
        id: user.id,
        providerUserId: user.providerUserId,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    }
  } catch {
    // Public routes still succeed when the token is absent or stale.
  }
  next();
}
