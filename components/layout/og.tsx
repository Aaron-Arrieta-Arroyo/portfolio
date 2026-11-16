import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const load = (p: string) => readFile(join(process.cwd(), p));

/** Social card in the site style: matte black, one amber accent, Geist. */
export async function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const [sans, mono, avatar] = await Promise.all([
    load("assets/fonts/Geist-SemiBold.ttf"),
    load("assets/fonts/GeistMono-Regular.ttf"),
    load("public/images/avatar.jpg"),
  ]);
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0A0A0A",
          backgroundImage: "radial-gradient(700px circle at 92% 110%, rgba(233,161,91,0.16), transparent 70%)",
          color: "#EDEDED",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#8A8A8A",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#E9A15B" }} />
            {eyebrow}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img src={avatarSrc} width={96} height={96} alt="" style={{ borderRadius: 96, border: "2px solid #232323" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: title.length > 22 ? 84 : 112, lineHeight: 0.95, letterSpacing: -4 }}>
            {title}
            <span style={{ color: "#E9A15B", marginLeft: -6 }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#8A8A8A", letterSpacing: -0.5, maxWidth: 900 }}>{subtitle}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5A5A5A",
            borderTop: "1px solid #232323",
            paddingTop: 24,
          }}
        >
          <span>{profile.fullName}</span>
          <span>Software Developer · Costa Rica</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sans, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
