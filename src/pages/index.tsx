import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { GetServerSideProps } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/residences',
      permanent: true,
    },
  };
};
