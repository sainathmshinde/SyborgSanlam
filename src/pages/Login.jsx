"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setStep(2);
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();

    setError("");

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{step === 1 ? "Login" : "OTP Verification"}</CardTitle>
          <CardDescription>
            {step === 1
              ? "Enter your credentials"
              : "Enter the OTP sent to your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="mb-4 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2 ">
                <Label htmlFor="email" className="required">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="siphokeita@example.com"
                  value="siphokeita@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="required">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value="sipho@123"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            </div>
          ) : (
            <div className="mb-4 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto">
            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="required">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="1234"
                  value="1234"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                Verify OTP
              </Button>
            </form>
            </div>
          )}

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer"
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
