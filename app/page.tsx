import { HeroSection } from "@/components/HeroSection"
import { WelcomeSection } from "@/components/WelcomeSection"
import { LatestGamesSection } from "@/components/LatestGamesSection"
import { VideoTutorialSection } from "@/components/VideoTutorialSection"
import { CommunitySection } from "@/components/CommunitySection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <LatestGamesSection />
      <VideoTutorialSection />
      <CommunitySection />
    </>
  )
}
