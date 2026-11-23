"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/site-chrome";
import { HomeUpcomingEvents } from "./components/home-upcoming-events";
import communityBanner from "./pictures/2e1d55f3-50ff-4f3f-b673-6a29e5207a4c (1).jpg";
import collegeLogo from "./pictures/CCS.png";

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
		title: "Officers",
		description: "Meet the people guiding our community and helping members connect.",
		href: "/officers",
		action: "Meet the team",
	},
];

export default function Home() {
	return (
		<>
			<SiteHeader activePath="/" />
			<main id="main-content">
				<section className="home-brand-section" aria-labelledby="home-brand-title">
					<Link
						className="wrap home-brand-inner home-brand-link"
						href="/about"
						aria-label="Learn about ELITES CONNECT"
					>
						<div className="home-brand-logos" aria-hidden="true">
							<div className="home-brand-mark home-college-mark">
								<Image src={collegeLogo} alt="" />
							</div>
							<div className="home-brand-mark">
								<Image
									src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ccs-elites-logo.png`}
									alt=""
									width={140}
									height={140}
								/>
							</div>
						</div>
						<div className="home-brand-copy">
							<p className="eyebrow">Gordon College · College of Computer Studies</p>
							<h2 id="home-brand-title">ELITES <span>CONNECT</span></h2>
							<p>Empowered League of Information Technology Education Students</p>
							<p className="home-brand-tagline">Empowering future I.T. professionals.</p>
						</div>
					</Link>
				</section>

				<section className="home-hero" aria-label="ELITES Connect community banner">
					<Image
						src={communityBanner}
						alt="Gordon College College of Computer Studies ELITES banner"
						priority
						className="home-hero-banner"
					/>
				</section>

				<HomeUpcomingEvents />

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

			</main>
			<SiteFooter />
		</>
	);
}
