import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
  username?: string;
  verificationUrl?: string;
}

export default function VerificationEmail({
  username = "Novel Enthusiast",
  verificationUrl = "https://novilist.com/verify?token=123",
}: VerificationEmailProps) {
  const previewText =
    "Welcome to Novilist! Please verify your email to start your reading journey.";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#F7F4F0] my-auto mx-auto font-sans">
          <Container className="bg-white border border-gray-200/50 rounded-lg p-8 my-10 mx-auto shadow-sm">
            {/* Header */}
            <Section className="mt-4 text-center">
              <Heading className="text-2xl font-bold text-[#42758F] m-0">
                Welcome to Novilist
              </Heading>
              <Text className="text-gray-600 mt-2 mb-0">
                Your journey through countless stories begins here
              </Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            {/* Main Content */}
            <Section>
              <Text className="text-gray-700 text-base">Dear {username},</Text>
              <Text className="text-gray-700 text-base">
                Thank you for joining Novilist! We're excited to have you as
                part of our community of web novel enthusiasts. Before you can
                start tracking your reading journey, please verify your email
                address.
              </Text>

              {/* Verification Button */}
              <Button
                className="bg-[#42758F] rounded-lg text-white py-3 px-12 text-base font-medium hover:bg-[#42758F]/90 block mx-auto my-8"
                href={verificationUrl}
              >
                Verify Email Address
              </Button>

              <Text className="text-gray-600 text-sm">
                If the button doesn't work, you can also copy and paste this
                link into your browser:
              </Text>
              <Text className="text-[#42758F] text-sm break-all">
                {verificationUrl}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-8" />

            {/* Footer */}
            <Section>
              <Text className="text-gray-600 text-sm text-center">
                This verification link will expire in 24 hours. If you didn't
                create an account on Novilist, you can safely ignore this email.
              </Text>
              <Text className="text-gray-500 text-xs text-center mt-6">
                © {new Date().getFullYear()} Novilist. All rights reserved.
                <br />
                <Link href="#" className="text-[#42758F] hover:underline">
                  Terms of Service
                </Link>
                {" • "}
                <Link href="#" className="text-[#42758F] hover:underline">
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
