import {
  Activity,
  ArrowRight,
  Brain,
  ChevronRight,
  FileText,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0908] text-white">
      <style>{`
        .mv-grid {
          background-image:
            linear-gradient(rgba(249,115,22,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,.055) 1px, transparent 1px);
          background-size: 42px 42px;
        }

        .mv-grid-move {
          animation: mv-drift 24s linear infinite;
          -webkit-mask-image: radial-gradient(
            ellipse at center,
            #000 15%,
            transparent 75%
          );
          mask-image: radial-gradient(
            ellipse at center,
            #000 15%,
            transparent 75%
          );
        }

        .mv-float {
          animation: mv-float 5s ease-in-out infinite;
        }

        .mv-float-b {
          animation: mv-float-b 6s ease-in-out infinite;
        }

        .mv-pulse {
          animation: mv-pulse 2.5s ease-in-out infinite;
        }

        .mv-rise {
          animation: mv-rise .8s ease both;
        }

        .mv-spin {
          animation: mv-spin 14s linear infinite;
        }

        .mv-spin-rev {
          animation: mv-spin 22s linear infinite reverse;
        }

        .mv-shimmer {
          background: linear-gradient(
            90deg,
            #f97316,
            #fdba74,
            #f97316,
            #ea580c,
            #f97316
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: mv-text 5s linear infinite;
        }

        @property --mv-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .mv-border {
          position: relative;
        }

        .mv-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          padding: 2px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--mv-angle),
            transparent 0 55%,
            #fb923c 82%,
            transparent 100%
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: mv-angle 4s linear infinite;
          pointer-events: none;
        }

        .mv-btn {
          position: relative;
          overflow: hidden;
        }

        .mv-btn::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -60%;
          width: 40%;
          background: linear-gradient(
            100deg,
            transparent,
            rgba(255,255,255,.4),
            transparent
          );
          transform: skewX(-20deg);
          transition: left .7s ease;
        }

        .mv-btn:hover::after {
          left: 130%;
        }

        .mv-link {
          position: relative;
        }

        .mv-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: #f97316;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .3s ease;
        }

        .mv-link:hover::after {
          transform: scaleX(1);
        }

        .mv-floor {
          position: absolute;
          z-index: 1;
          left: -25%;
          right: -25%;
          bottom: -18%;
          height: 78%;
          background-image:
            linear-gradient(rgba(249,115,22,.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,.5) 1px, transparent 1px);
          background-size: 55px 55px;
          transform: perspective(700px) rotateX(62deg);
          transform-origin: center bottom;
          -webkit-mask-image: linear-gradient(
            to top,
            #000 0%,
            rgba(0,0,0,.95) 30%,
            rgba(0,0,0,.55) 65%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to top,
            #000 0%,
            rgba(0,0,0,.95) 30%,
            rgba(0,0,0,.55) 65%,
            transparent 100%
          );
          animation: mv-floor 5s linear infinite;
          opacity: .65;
        }

        .mv-cube-wrapper {
          position: absolute;
          z-index: 2;
          transform-style: preserve-3d;
        }

        .mv-cube {
          position: relative;
          width: var(--s);
          height: var(--s);
          transform-style: preserve-3d;
          animation: mv-cube 20s linear infinite;
        }

        .mv-cube span {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(249,115,22,.8);
          background: linear-gradient(
            135deg,
            rgba(249,115,22,.18),
            rgba(249,115,22,.02)
          );
          box-shadow:
            inset 0 0 25px rgba(249,115,22,.15),
            0 0 25px rgba(249,115,22,.08);
        }

        .mv-cube span:nth-child(1) {
          transform: translateZ(calc(var(--s) / 2));
        }

        .mv-cube span:nth-child(2) {
          transform: rotateY(90deg) translateZ(calc(var(--s) / 2));
        }

        .mv-cube span:nth-child(3) {
          transform: rotateY(180deg) translateZ(calc(var(--s) / 2));
        }

        .mv-cube span:nth-child(4) {
          transform: rotateY(-90deg) translateZ(calc(var(--s) / 2));
        }

        .mv-cube span:nth-child(5) {
          transform: rotateX(90deg) translateZ(calc(var(--s) / 2));
        }

        .mv-cube span:nth-child(6) {
          transform: rotateX(-90deg) translateZ(calc(var(--s) / 2));
        }

        .mv-steps {
          position: relative;
        }

        @media (min-width: 768px) {
          .mv-steps::before {
            content: "";
            position: absolute;
            left: 7%;
            right: 7%;
            top: 40px;
            height: 1px;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(249,115,22,.5),
              transparent
            );
            z-index: 0;
          }

          .mv-steps::after {
            content: "";
            position: absolute;
            top: 37px;
            left: 7%;
            width: 65px;
            height: 7px;
            border-radius: 9999px;
            background: radial-gradient(
              closest-side,
              #fb923c,
              transparent
            );
            z-index: 0;
            animation: mv-travel 4.5s ease-in-out infinite;
          }
        }

        @supports (animation-timeline: view()) {
          .mv-reveal {
            animation: mv-reveal linear both;
            animation-timeline: view();
            animation-range: entry 0% entry 35%;
          }
        }

        @keyframes mv-floor {
          from {
            background-position: 0 0, 0 0;
          }

          to {
            background-position: 0 55px, 55px 0;
          }
        }

        @keyframes mv-cube {
          from {
            transform: rotateX(-24deg) rotateY(0deg);
          }

          to {
            transform: rotateX(-24deg) rotateY(360deg);
          }
        }

        @keyframes mv-drift {
          to {
            background-position: 42px 42px;
          }
        }

        @keyframes mv-float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes mv-float-b {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(8px);
          }
        }

        @keyframes mv-pulse {
          0%, 100% {
            opacity: .35;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes mv-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mv-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes mv-text {
          to {
            background-position: 200% center;
          }
        }

        @keyframes mv-angle {
          to {
            --mv-angle: 360deg;
          }
        }

        @keyframes mv-travel {
          0% {
            left: 7%;
            opacity: 0;
          }

          15%, 85% {
            opacity: 1;
          }

          100% {
            left: calc(93% - 65px);
            opacity: 0;
          }
        }

        @keyframes mv-reveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mv-grid-move,
          .mv-float,
          .mv-float-b,
          .mv-pulse,
          .mv-rise,
          .mv-spin,
          .mv-spin-rev,
          .mv-shimmer,
          .mv-border::before,
          .mv-steps::after,
          .mv-reveal,
          .mv-floor,
          .mv-cube {
            animation: none;
          }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-orange-500/10 bg-[#0b0908]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-black shadow-lg shadow-orange-500/30">
              <ScanLine size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Medical<span className="text-orange-500">Vision</span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.18em] text-neutral-500">
                AI Imaging Platform
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="mv-link text-sm text-neutral-400 transition hover:text-orange-400"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="mv-link text-sm text-neutral-400 transition hover:text-orange-400"
            >
              How it works
            </a>

            <a
              href="#about"
              className="mv-link text-sm text-neutral-400 transition hover:text-orange-400"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="mv-btn rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:from-orange-400 hover:to-orange-500"
            >
              Register
            </Link>

            <Link
              to="/login"
              className="hidden px-3 py-2 text-sm text-neutral-300 transition hover:text-orange-400 sm:block"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="mv-grid mv-grid-move absolute inset-0 z-0 opacity-60" />

            <div className="absolute -left-32 top-20 z-0 h-[450px] w-[450px] rounded-full bg-orange-600/15 blur-[130px]" />

            <div className="absolute right-0 top-0 z-0 h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[140px]" />

            <div className="mv-floor" />

            <div
              className="mv-cube-wrapper bottom-[8%] left-[5%] hidden lg:block"
              style={{ perspective: "900px" }}
            >
              <div className="mv-cube" style={{ "--s": "110px" }}>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div
              className="mv-cube-wrapper right-[5%] top-[14%] hidden lg:block"
              style={{ perspective: "900px" }}
            >
              <div
                className="mv-cube"
                style={{
                  "--s": "70px",
                  animationDuration: "28s",
                  animationDirection: "reverse",
                }}
              >
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="absolute inset-0 z-[3] bg-gradient-to-b from-transparent via-transparent to-[#0b0908]/90" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[650px] max-w-7xl items-center gap-8 px-6 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
            <div className="mv-rise">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-400 shadow-[0_0_30px_rgba(249,115,22,.15)]">
                <Sparkles size={13} />
                AI-Powered Medical Imaging
              </div>

              <h2 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Smarter
                <span className="mv-shimmer"> medical imaging</span>
                <br />
                through AI.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
                Analyze medical images, visualize important findings, manage
                patients, and create structured diagnostic reports from one
                modern platform.
              </p>

              {/* <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="mv-btn group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 text-sm font-semibold text-black shadow-xl shadow-orange-500/30 transition hover:from-orange-400 hover:to-orange-500"
                >
                  Start Exploring
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-lg border border-orange-500/25 bg-[#120e0b]/70 px-6 py-3.5 text-sm font-medium text-neutral-200 backdrop-blur transition hover:border-orange-500/60 hover:bg-orange-500/5 hover:text-orange-400"
                >
                  Sign In
                </Link>
              </div> */}

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-neutral-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-orange-500" />
                  AI-assisted analysis
                </span>

                <span className="flex items-center gap-2">
                  <ScanLine size={14} className="text-orange-500" />
                  Scan visualization
                </span>

                <span className="flex items-center gap-2">
                  <FileText size={14} className="text-orange-500" />
                  Structured reports
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[390px] lg:ml-auto lg:mr-8">
              <div className="absolute -inset-12 rounded-full bg-orange-600/10 blur-[100px]" />

              <div className="relative flex aspect-square items-center justify-center">
                <div className="mv-spin-rev absolute h-[320px] w-[320px] rounded-full border border-dashed border-orange-500/20" />

                <div className="mv-spin absolute h-[250px] w-[250px] rounded-full border border-orange-500/15 border-t-orange-500/80" />

                <div className="mv-spin-rev absolute h-[180px] w-[180px] rounded-full border border-orange-500/20 border-b-orange-400/80" />

                <div className="absolute h-[140px] w-[140px] rounded-full bg-orange-500/10 blur-3xl" />

                <div className="mv-border mv-float flex h-28 w-28 items-center justify-center rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/25 to-[#17100c] shadow-[0_0_70px_rgba(249,115,22,.3)]">
                  <Brain
                    size={52}
                    strokeWidth={1.2}
                    className="text-orange-400"
                  />
                </div>

                <div className="mv-pulse absolute left-[15%] top-[25%] h-1.5 w-1.5 rounded-full bg-orange-500" />

                <div className="mv-pulse absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-orange-400" />

                <div className="mv-pulse absolute bottom-[23%] left-[22%] h-1 w-1 rounded-full bg-orange-500" />

                <div className="mv-pulse absolute bottom-[20%] right-[22%] h-1.5 w-1.5 rounded-full bg-orange-500" />

                <div className="mv-float-b absolute right-[10%] top-[13%] rounded-full border border-orange-500/30 bg-[#17100c] px-2.5 py-1.5 shadow-lg shadow-orange-500/20">
                  <Sparkles size={11} className="text-orange-500" />
                </div>

                <div className="mv-float absolute bottom-[13%] left-[9%] rounded-full border border-orange-500/30 bg-[#17100c] px-2.5 py-1.5 shadow-lg shadow-orange-500/20">
                  <Activity size={11} className="text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative border-y border-orange-500/10 bg-[#100d0b]"
        >
          <div className="mv-grid pointer-events-none absolute inset-0 opacity-20" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Platform
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need for
                <span className="mv-shimmer"> AI-assisted imaging</span>
              </h3>

              <p className="mt-4 text-sm leading-6 text-neutral-400">
                A unified platform for managing patients, analyzing scans,
                reviewing findings, and creating structured reports.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={Brain}
                title="AI Analysis"
                description="Analyze medical images and receive structured AI-assisted findings."
              />

              <FeatureCard
                icon={ScanLine}
                title="Scan Visualization"
                description="View medical images and explore AI-generated analysis results."
              />

              <FeatureCard
                icon={Stethoscope}
                title="Patient Management"
                description="Keep patient information and associated scans organized."
              />

              <FeatureCard
                icon={ShieldCheck}
                title="Diagnostic Reports"
                description="Create structured reports with notes, findings, and verdicts."
              />
            </div>
          </div>
        </section>

        <section id="workflow" className="relative overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-80 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/10 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Simple workflow
              </p>

              <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
                From image to insight
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
                A simple workflow designed to keep medical image analysis
                organized.
              </p>
            </div>

            <div className="mv-steps mt-10 grid gap-4 md:grid-cols-4">
              <WorkflowStep
                number="01"
                icon={Upload}
                title="Upload Scan"
                description="Upload a supported medical image and connect it with a patient."
              />

              <WorkflowStep
                number="02"
                icon={Brain}
                title="AI Analysis"
                description="Use AI to analyze the uploaded medical image."
              />

              <WorkflowStep
                number="03"
                icon={Activity}
                title="Review Findings"
                description="Review analysis results and detected regions."
              />

              <WorkflowStep
                number="04"
                icon={FileText}
                title="Create Report"
                description="Generate a structured report from the analysis."
              />
            </div>
          </div>
        </section>

        <section id="about" className="px-6 pb-16 lg:px-8">
          <div className="mv-reveal relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#2e1a0d] via-[#15100d] to-[#0d0b0a] px-6 py-14 text-center shadow-[0_30px_80px_-40px_rgba(249,115,22,.6)]">
            <div className="mv-grid absolute inset-0 opacity-20" />

            <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-orange-500/15 blur-[100px]" />

            <div className="relative">
              <div className="mv-float mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/40 shadow-[0_0_30px_rgba(249,115,22,.3)]">
                <Sparkles size={22} />
              </div>

              <h3 className="mt-5 text-3xl font-bold sm:text-4xl">
                Explore AI-powered
                <span className="mv-shimmer"> medical imaging</span>
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
                An educational platform demonstrating how AI and modern web
                technologies can work together for medical image analysis.
              </p>

              <Link
                to="/register"
                className="mv-btn group mt-7 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/30 transition hover:from-orange-400 hover:to-orange-500"
              >
                Create Your Account
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-orange-500/10 bg-[#090807]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ScanLine size={16} className="text-orange-500" />
            Medical<span className="text-orange-500">Vision</span>
          </div>

          <p className="text-xs text-neutral-600">
            Educational project · Not intended for clinical diagnosis · © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="mv-reveal group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#1b130e] to-[#0e0c0b] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_50px_-25px_rgba(249,115,22,.6)]">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/10 blur-2xl transition group-hover:bg-orange-500/20" />

      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20 transition group-hover:bg-orange-500 group-hover:text-black">
        <Icon size={19} />
      </div>

      <h4 className="relative mt-4 text-sm font-semibold">{title}</h4>

      <p className="relative mt-2 text-xs leading-5 text-neutral-500 transition group-hover:text-neutral-400">
        {description}
      </p>
    </div>
  );
}

function WorkflowStep({ number, icon: Icon, title, description }) {
  return (
    <div className="mv-reveal group relative z-10 rounded-xl border border-white/10 bg-[#110e0c] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_50px_-25px_rgba(249,115,22,.6)]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-black shadow-lg shadow-orange-500/30 transition group-hover:scale-105">
          <Icon size={18} />
        </div>

        <span className="text-xl font-bold text-orange-500/30 transition group-hover:text-orange-500/70">
          {number}
        </span>
      </div>

      <h4 className="mt-5 text-sm font-semibold">{title}</h4>

      <p className="mt-2 text-xs leading-5 text-neutral-500">{description}</p>
    </div>
  );
}

export default Landing;
