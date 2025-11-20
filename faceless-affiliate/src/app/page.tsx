"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type LengthOption = {
  id: string;
  label: string;
  seconds: number;
  promise: string;
};

type FormState = {
  productName: string;
  productDescription: string;
  audience: string;
  benefits: string;
  painPoints: string;
  affiliateLink: string;
  desiredLength: string;
  platform: string;
  tone: string;
};

type ScriptBeat = {
  label: string;
  duration: number;
  voiceover: string;
  brollIdeas: string[];
  overlays: string[];
};

type ContentAngle = {
  title: string;
  hook: string;
  voiceover: string;
  caption: string;
};

type GeneratedPlan = {
  hooks: string[];
  quickSummary: string;
  scriptBeats: ScriptBeat[];
  contentAngles: ContentAngle[];
  callToAction: string;
  overlayTextStack: string[];
  caption: string;
  hashtags: string[];
  uploadChecklist: string[];
  schedule: { day: string; concept: string; objective: string }[];
  automationStack: string[];
  thumbnailPrompts: string[];
};

const lengthOptions: LengthOption[] = [
  {
    id: "15",
    label: "15s Flash Promo",
    seconds: 15,
    promise: "punchy hook and single proof point",
  },
  {
    id: "30",
    label: "30s Scroll Stopper",
    seconds: 30,
    promise: "problem > solution > CTA arc",
  },
  {
    id: "45",
    label: "45s Story Mode",
    seconds: 45,
    promise: "mini story with stacked benefits",
  },
  {
    id: "60",
    label: "60s Deep Dive",
    seconds: 60,
    promise: "full walkthrough and objection crush",
  },
];

const platformOptions = [
  "TikTok",
  "Instagram Reels",
  "YouTube Shorts",
  "Pinterest Idea Pin",
];

const toneOptions = ["Hype", "Trustworthy", "Educational", "Relaxed"];

const parseList = (value: string) =>
  value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);

const choose = <T,>(items: T[], fallback: T) =>
  items.length ? items[Math.floor(Math.random() * items.length)] : fallback;

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const humanizeSeconds = (seconds: number) => `${seconds}s`;

function generatePlan(form: FormState): GeneratedPlan {
  const length = lengthOptions.find((option) => option.id === form.desiredLength)
    ?.seconds;
  const totalSeconds = length ?? 30;

  const benefits = parseList(form.benefits);
  const pains = parseList(form.painPoints);

  const heroBenefit = benefits[0] ?? capitalize(form.productDescription);
  const secondaryBenefit = benefits[1] ?? benefits[0] ?? "the core feature";
  const corePain = pains[0] ?? `struggling to keep up with ${form.audience}`;

  const hookTemplates = [
    `What if ${form.audience || "you"} could ${heroBenefit.toLowerCase()} in ${humanizeSeconds(
      Math.min(8, totalSeconds / 2)
    )}?`,
    `${choose(
      ["POV", "If you're", "The exact way", "How I automate"],
      "POV"
    )}: ${capitalize(corePain)} ends with ${form.productName}.`,
    `${form.productName} hack: ${heroBenefit.toLowerCase()} without showing your face.`,
    `Stop scrolling—${capitalize(
      corePain
    )}? Use this ${form.platform.toLowerCase()} ready plug.`,
  ];

  const toneFlavor: Record<string, string> = {
    Hype: "energetic and punchy voiceover with fast cuts",
    Trustworthy: "calm pacing with clean typography overlays",
    Educational: "step-by-step voiceover with on-screen text summaries",
    Relaxed: "softer pacing with cozy visuals and soft gradients",
  };

  const shotBlueprint = [
    { label: "Hook", ratio: 0.2 },
    { label: "Problem", ratio: 0.2 },
    { label: "Solution Setup", ratio: 0.18 },
    { label: "Proof / Demo", ratio: 0.27 },
    { label: "CTA", ratio: 0.15 },
  ];

  const shotPrompts: Record<string, string[]> = {
    Hook: [
      `Bold text overlay: "${heroBenefit}"`,
      "B-roll: quick scroll-stopping screen recording",
      "Emoji pop: 🔥 + product box shot",
    ],
    Problem: [
      `Relatable screenshots of ${corePain}`,
      `Text prompt: "Tired of ${corePain}?"`,
      "Stock clip that visualizes frustration",
    ],
    "Solution Setup": [
      `Show ${form.productName} interface or packaging`,
      "Overlay bullet of top benefit",
      "Cursor or finger pointing to key feature",
    ],
    "Proof / Demo": [
      `Screen capture of feature solving "${corePain}"`,
      "Side-by-side before/after",
      "Metric or testimonial pop-in",
    ],
    CTA: [
      `Big CTA card with "${form.affiliateLink || "Grab it via my link"}"`,
      "Countdown sticker to trigger urgency",
      "Animated arrow to profile/bio",
    ],
  };

  const overlayPhrases = [
    `Step-by-step ${form.platform} ready`,
    `${form.productName} in action`,
    `${choose(
      ["No talking head needed", "Faceless creator friendly", "Set-and-forget flow"],
      "Faceless creator friendly"
    )}`,
    "Hook • Proof • CTA framework",
    "Trust badges & social proof built-in",
    `Promote it in under ${humanizeSeconds(totalSeconds)}`,
  ];

  const scriptBeats: ScriptBeat[] = shotBlueprint.map(({ label, ratio }) => {
    const duration = Math.max(3, Math.round(totalSeconds * ratio));
    const voiceoverParts: Record<string, string> = {
      Hook: `"${hookTemplates[0]}" with animated captions synced to each word.`,
      Problem: `Narrate a quick story: "${capitalize(
        corePain
      )}. I used to waste hours..."`,
      "Solution Setup": `Introduce ${form.productName} and highlight ${heroBenefit}.`,
      "Proof / Demo": `Walk through ${secondaryBenefit} using captions like "Watch this..."`,
      CTA: `Land the CTA: "Hit the link for ${
        form.affiliateLink ? "exclusive access" : "the exact tool"
      }" and reiterate payoff.`,
    };

    return {
      label,
      duration,
      voiceover: voiceoverParts[label],
      brollIdeas: shotPrompts[label],
      overlays: [
        overlayPhrases[label === "Hook" ? 0 : label === "CTA" ? 2 : 1],
        overlayPhrases[label === "Proof / Demo" ? 4 : 3],
      ],
    };
  });

  const angles: ContentAngle[] = [
    {
      title: "Pain > Relief",
      hook: choose(hookTemplates, hookTemplates[0]),
      voiceover: `Call out ${corePain}, then show ${form.productName} solving it step-by-step.`,
      caption: `Feeling ${corePain}? ${form.productName} fixes it in minutes. Link + bonus in bio.`,
    },
    {
      title: "Behind-the-Automation",
      hook: '"This is how my faceless funnel runs while I sleep."',
      voiceover: "Walk through the automation: trigger, product highlight, affiliate link redirection.",
      caption: `Faceless affiliate setup using ${form.productName}. Save & follow for the full workflow.`,
    },
    {
      title: "Testimonial Remix",
      hook: `"I tried ${form.productName} for 7 days — here are the receipts."`,
      voiceover: `Break down metrics or quotes, then stack benefits ${
        benefits.slice(0, 2).join(" & ") || heroBenefit
      }.`,
      caption: `Proof the internet loves: ${form.productName} users = ${heroBenefit.toLowerCase()}. Grab my preloaded template.`,
    },
  ];

  const captionBody = [
    `${form.productName} + faceless system = ${heroBenefit.toLowerCase()}.`,
    "Step 1️⃣ Hook them with a scroll-stopper.",
    "Step 2️⃣ Show the workflow without ever filming your face.",
    `Step 3️⃣ Drop the CTA with ${form.affiliateLink || "your custom link"}.`,
    "",
    'Save this breakdown + comment "FACELess" so I DM the automation stack.',
  ].join("\n");

  const hashSet = [
    "#facelessmarketing",
    "#affiliateautomation",
    "#contentworkflow",
    `#${form.platform.replace(/\s+/g, "").toLowerCase()}tips`,
    `#${form.productName.replace(/\s+/g, "").toLowerCase()}`,
  ];

  const uploadChecklist = [
    "Record voiceover in a quiet space or use generated AI voice;",
    "Layer captions with high contrast fonts (Geist/Bold);",
    "Stack 2-3 proof shots or metrics mid-video;",
    "Punch in on CTA with animated arrow to link placeholder;",
    `Add ${choose(["lofi beat", "future bass loop", "upbeat pop"], "lofi beat")} track from royalty-free library;`,
    "Preview at 1.25x speed to ensure pacing hits the beat.",
  ];

  const schedule = [
    {
      day: "Day 1",
      concept: "Primary pain-point hook",
      objective: "Capture attention + tag link in bio in comments",
    },
    {
      day: "Day 3",
      concept: "Automation walkthrough",
      objective: "Educate + reposition as faceless friendly",
    },
    {
      day: "Day 5",
      concept: "Social proof remix",
      objective: "Stack testimonials + hard CTA with urgency",
    },
  ];

  const automationStack = [
    `${form.productName} dashboard screen recording`,
    "CapCut template with auto captions & bold keywords",
    "Metric overlays pulled from Google Sheets or Notion widget",
  ];

  const thumbnailPrompts = [
    `Split screen: left "Before" dark, right "After" bright with ${form.productName}.`,
    'Bold text "Faceless Funnel" + product mockup on gradient background.',
    `Minimalist layout: timer icon + "${heroBenefit}" headline + arrow to CTA.`,
  ];

  return {
    hooks: hookTemplates,
    quickSummary: `${form.productName} + ${form.platform} ${lengthOptions.find(
      (option) => option.id === form.desiredLength
    )?.promise} — ${toneFlavor[form.tone]}.`,
    scriptBeats,
    contentAngles: angles,
    callToAction: `Drop "${
      form.affiliateLink || "FACELINK"
    }" in captions + pin comment directing viewers to your bio.`,
    overlayTextStack: overlayPhrases,
    caption: captionBody,
    hashtags: hashSet,
    uploadChecklist,
    schedule,
    automationStack,
    thumbnailPrompts,
  };
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
    productName: "Instant Funnel OS",
    productDescription: "Automation dashboard for affiliate marketers",
    audience: "busy side hustlers",
    benefits: ["Done-for-you funnel templates", "Daily content scripts"].join("\n"),
    painPoints: ["No time to film", "Scared of showing face"].join("\n"),
    affiliateLink: "mybio.io/funnel-os",
    desiredLength: lengthOptions[1].id,
    platform: platformOptions[0],
    tone: toneOptions[2],
  });
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedLength = useMemo(
    () => lengthOptions.find((option) => option.id === form.desiredLength),
    [form.desiredLength]
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);
    const nextPlan = generatePlan(form);
    setPlan(nextPlan);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 text-zinc-50">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.3),_transparent)]" />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pt-16">
        <header className="flex flex-col gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-10 shadow-2xl shadow-indigo-500/20 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-indigo-300">
                Faceless Affiliate Studio
              </p>
              <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
                Build scroll-stopping faceless promos in minutes
              </h1>
            </div>
            <div className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-200">
              {form.platform} · {selectedLength?.label}
            </div>
          </div>
          <p className="max-w-3xl text-lg text-zinc-300">
            Drop your offer details and instantly receive a faceless video workflow: hook scripts,
            B-roll prompts, overlays, captions, and posting schedule crafted for affiliates who
            never step on camera.
          </p>
          <ul className="flex flex-wrap gap-3 text-xs text-zinc-400">
            {["Hook · Proof · CTA template", "Auto captions + overlay copy", "Cross-platform publishing angles", "Affiliate-specific callouts"].map(
              (item) => (
                <li key={item} className="rounded-full border border-zinc-800 bg-zinc-950/70 px-4 py-2">
                  {item}
                </li>
              )
            )}
          </ul>
        </header>

        <section className="grid gap-12 lg:grid-cols-[340px_minmax(0,1fr)]">
          <form
            onSubmit={handleGenerate}
            className="flex flex-col gap-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-lg shadow-black/40 backdrop-blur"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-50">Offer blueprint</h2>
              <p className="text-sm text-zinc-400">
                Describe your product once to unlock a complete faceless script.
              </p>
            </div>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-zinc-300">Product name</span>
              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="e.g. Reels Reactor Toolkit"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-zinc-300">Product description</span>
              <textarea
                name="productDescription"
                value={form.productDescription}
                onChange={handleChange}
                rows={3}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="What does it do in one or two sentences?"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-zinc-300">Target audience</span>
              <input
                name="audience"
                value={form.audience}
                onChange={handleChange}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="e.g. solo founders, busy moms, digital nomads"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-zinc-300">Core benefits (one per line or comma)</span>
              <textarea
                name="benefits"
                value={form.benefits}
                onChange={handleChange}
                rows={3}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="Automated daily scripts, Proof-based CTA, Monetized funnel templates"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-zinc-300">Pain points (one per line or comma)</span>
              <textarea
                name="painPoints"
                value={form.painPoints}
                onChange={handleChange}
                rows={3}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="Hate filming yourself, Zero content ideas, No proof"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-zinc-300">Affiliate link (optional)</span>
              <input
                name="affiliateLink"
                value={form.affiliateLink}
                onChange={handleChange}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder="Link in bio / special URL"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-zinc-300">Video length</span>
                <select
                  name="desiredLength"
                  value={form.desiredLength}
                  onChange={handleChange}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  {lengthOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-zinc-300">Primary platform</span>
                <select
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  {platformOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm">
              <span className="text-zinc-300">Tone</span>
              <select
                name="tone"
                value={form.tone}
                onChange={handleChange}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-base text-zinc-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                {toneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={isGenerating}
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-indigo-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-indigo-500/50"
            >
              {isGenerating ? "Building workflow..." : "Generate faceless video plan"}
            </button>
            {selectedLength && (
              <p className="text-xs text-zinc-500">
                This preset leans on a {selectedLength.seconds}s timeline focused on {selectedLength.promise}.
              </p>
            )}
          </form>

          <section className="flex flex-col gap-10">
            {plan ? (
              <>
                <div className="rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-8">
                  <h2 className="text-2xl font-semibold text-indigo-200">Faceless workflow ready</h2>
                  <p className="mt-3 max-w-2xl text-sm text-indigo-100/90">{plan.quickSummary}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {plan.hooks.map((hook) => (
                      <div
                        key={hook}
                        className="rounded-2xl border border-indigo-400/30 bg-indigo-600/10 px-5 py-4 text-sm text-indigo-100"
                      >
                        <span className="block text-xs uppercase tracking-widest text-indigo-200/70">
                          Hook idea
                        </span>
                        <p className="mt-2 font-medium leading-relaxed">{hook}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8">
                  <h2 className="text-xl font-semibold text-zinc-100">Beat-by-beat timeline</h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Map each beat to a clip, then layer captions and overlays to match the voiceover.
                  </p>
                  <div className="mt-6 flex flex-col gap-4">
                    {plan.scriptBeats.map((beat) => (
                      <div
                        key={beat.label}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-lg font-semibold text-zinc-100">{beat.label}</h3>
                          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                            {humanizeSeconds(beat.duration)}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-zinc-300">{beat.voiceover}</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                            <span className="text-xs uppercase tracking-widest text-zinc-500">
                              B-roll prompts
                            </span>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                              {beat.brollIdeas.map((idea) => (
                                <li key={idea}>• {idea}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                            <span className="text-xs uppercase tracking-widest text-zinc-500">
                              Overlay copy
                            </span>
                            <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                              {beat.overlays.map((overlay) => (
                                <li key={overlay}>• {overlay}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
                    <h2 className="text-xl font-semibold text-zinc-100">Multi-platform angles</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Rotate these stories to keep feeds warm without filming new clips.
                    </p>
                    <div className="mt-5 flex flex-col gap-4">
                      {plan.contentAngles.map((angle) => (
                        <div
                          key={angle.title}
                          className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-base font-semibold text-zinc-100">{angle.title}</h3>
                            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] uppercase tracking-wide text-zinc-400">
                              Hook swap
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-zinc-300">
                            <span className="font-medium text-zinc-100">Hook:</span> {angle.hook}
                          </p>
                          <p className="mt-2 text-sm text-zinc-300">
                            <span className="font-medium text-zinc-100">Voiceover:</span> {angle.voiceover}
                          </p>
                          <p className="mt-2 text-sm text-zinc-400">
                            <span className="font-medium text-zinc-100">Caption:</span> {angle.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                      <h3 className="text-lg font-semibold text-zinc-100">Caption + hashtag stack</h3>
                      <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-300">
                        {plan.caption}
                      </pre>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-indigo-200">
                        {plan.hashtags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                      <h3 className="text-lg font-semibold text-zinc-100">Overlay stack</h3>
                      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                        {plan.overlayTextStack.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-100">CTA blueprint</h3>
                    <p className="mt-3 text-sm text-zinc-300">{plan.callToAction}</p>
                  </div>
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-100">Automation stack</h3>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                      {plan.automationStack.map((item) => (
                        <li
                          key={item}
                          className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-100">Thumbnail prompts</h3>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                      {plan.thumbnailPrompts.map((item) => (
                        <li
                          key={item}
                          className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-100">Upload checklist</h3>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                      {plan.uploadChecklist.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-[6px] h-2 w-2 rounded-full bg-indigo-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
                    <h3 className="text-lg font-semibold text-zinc-100">Posting cadence</h3>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                      {plan.schedule.map((slot) => (
                        <li
                          key={slot.day}
                          className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
                        >
                          <p className="text-xs uppercase tracking-widest text-zinc-500">
                            {slot.day}
                          </p>
                          <p className="mt-1 font-medium text-zinc-100">{slot.concept}</p>
                          <p className="text-xs text-zinc-400">{slot.objective}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center text-sm text-zinc-400">
                Fill the offer blueprint to generate a complete faceless workflow.
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
