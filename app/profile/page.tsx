"use client";

import { useAuth } from '../auth-context';

export default function ProfilePage() {
  const { session } = useAuth();

  if (!session) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome, {session.user.email}</h1>
    </div>
  );
}