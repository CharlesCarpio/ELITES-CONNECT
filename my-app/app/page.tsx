"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "./components/site-chrome";

const platforms = [
	{
		number: "01",
		title: "Announcements",
		description: "News, notices, and important updates from the community.",
		href: "/announcements",
		action: "Read updates",
	},
	{
		number: "02",
		title: "Events",
		description: "Meetups, gatherings, and ways to get involved.",
		href: "/events",
		action: "View calendar",
	},
	{
		number: "03",
		title: "Projects",
		description: "See what members are building and the progress so far.",
		href: "/projects",
		action: "Explore projects",
	},
	{
		number: "04",
		title: "Officers",
		description: "Meet the people guiding our community and helping members connect.",
		href: "/officers",
		action: "Meet the team",
	},
];

export default function Home() {
	const [introVisible, setIntroVisible] = useState(true);

	useEffect(() => {
		const timer = window.setTimeout(() => setIntroVisible(false), 5200);
		return () => window.clearTimeout(timer);
	}, []);

	return (
		<>
			{introVisible && (
				<div className="site-intro" role="dialog" aria-label="ELITES CONNECT introduction">
					<div className="intro-grid" aria-hidden="true" />
					<button className="intro-skip" type="button" onClick={() => setIntroVisible(false)}>
						Skip intro <span aria-hidden="true">↗</span>
					</button>
					<div className="intro-terminal">
						<p className="intro-code"><span>BSIT://</span> ELITES-CONNECT</p>
						<div className="intro-mark">
							<Image
								src="/ccs-elites-logo.png"
								alt="CCS ELITES logo"
								width={180}
								height={180}
								priority
								unoptimized
							/>
						</div>
						<p className="intro-kicker">BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</p>
						<h1><span>ELITES</span> CONNECT</h1>
						<p className="intro-tagline">Built for the future. Powered by community.</p>
						<div className="intro-loader" aria-label="Loading website">
							<span />
						</div>
						<p className="intro-status"><span>●</span> INITIALIZING NETWORK_2026</p>
					</div>
				</div>
			)}
			<SiteHeader activePath="/" />
			<main id="main-content">
				<section className="home-hero">
					<div className="wrap home-hero-inner">
						<div className="home-copy">
							<p className="eyebrow">
								<span className="live-dot" /> BSIT community network
							</p>
							<h1>
								Ideas in code.
								<br />
								Impact <span>in action.</span>
							</h1>
							<p className="hero-description">
								ELITES CONNECT is the digital home for BSIT students—where
								people connect, ideas become projects, and every member helps
								shape what comes next.
							</p>
							<Link className="button button-orange" href="/announcements">
								Enter the community <span aria-hidden="true">↗</span>
							</Link>
							<p className="hero-note">
								LEARN <span>·</span> CREATE <span>·</span> CONNECT
							</p>
						</div>
						<div
							className="home-art"
							aria-label="Members connecting outdoors"
						>
							<div className="home-photo-frame">
								<Image
									src="/elites-community-banner.jpg"
									alt="Gordon College College of Computer Studies ELITES banner"
									width={1400}
									height={800}
									priority
									className="home-photo"
								/>
							</div>
							<div className="photo-stamp">
								<span>BSIT</span>
								<strong>ELITES</strong>
								<small>EMPOWERING FUTURE I.T. PROFESSIONALS</small>
							</div>
							<div className="photo-caption">
								<span>COLLEGE OF COMPUTER STUDIES</span>
								<strong>Empower the future.</strong>
							</div>
							<span className="art-index" aria-hidden="true">
								EC / 26
							</span>
						</div>
					</div>
				</section>

				<section
					className="platforms-section wrap"
					aria-labelledby="platforms-title"
				>
					<div className="platforms-heading">
						<div>
							<p className="eyebrow">Choose your destination</p>
							<h2 id="platforms-title">The community, organized.</h2>
						</div>
						<p>Everything you need, one clear path at a time.</p>
					</div>
					<div className="platform-grid">
						{platforms.map((platform) => (
							<Link
								className="platform-link"
								href={platform.href}
								key={platform.href}
							>
								<span className="platform-number">{platform.number}</span>
								<span
									className="platform-arrow"
									aria-hidden="true"
								>
									↗
								</span>
								<h3>{platform.title}</h3>
								<p>{platform.description}</p>
								<span className="platform-action">
									{platform.action}
								</span>
							</Link>
						))}
					</div>
				</section>

				<section className="home-about">
					<div className="wrap home-about-inner">
						<p className="eyebrow">Who we are</p>
						<h2>
							One connected community.
							<br />
							<span>Many ways to make an impact.</span>
						</h2>
						<p>
							ELITES CONNECT brings members together through clear
							communication, meaningful events, and projects that benefit our
							community.
						</p>
						<Link
							href="/officers"
							className="text-link"
						>
							Meet the people behind it{" "}
							<span aria-hidden="true">→</span>
						</Link>
					</div>
				</section>
			</main>
			<SiteFooter />
		</>
	);
}
