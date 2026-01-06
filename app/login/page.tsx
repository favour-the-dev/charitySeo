"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Quote } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import AuthService from "@/services/Auth";
import { useUserStore } from "@/lib/user-store";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await AuthService.login(email, password);
      setUser(res.data.user);
      toast.success(`${res.message}`);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Credentials do not match our records");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="*******"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-2">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative h-full">
        <div className="absolute inset-0 bg-zinc-900/20 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-20 flex flex-col justify-between h-full p-10 text-white">
          <div className="flex items-center gap-2 font-bold text-xl">
            Localmator
          </div>
          <div className="space-y-4 max-w-lg">
            <Quote className="h-8 w-8 opacity-80" />
            <blockquote className="text-2xl font-medium leading-relaxed">
              &quot;Localmator has completely transformed how we listen to our
              donors and volunteers. The insights we get are invaluable.&quot;
            </blockquote>
            <div className="flex items-center gap-4 mt-4">
              <div className="h-10 w-10 rounded-full bg-white/20" />
              <div>
                <div className="font-semibold">Sarah Jenkins</div>
                <div className="text-sm opacity-80">
                  Director of Outreach, Global Aid
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
