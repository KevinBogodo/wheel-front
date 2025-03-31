import AppContent from "@/components/Global/app-content"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JackpotDraw from "./Jackpot-draw"
import JackpotConfig from "./Jackpot-config"

const JackpotSetting = () => {
  return (
    <AppContent className="flex flex-col w-full h-full">
        <Tabs defaultValue="jackpot" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jackpot">Cagnotte</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>
          <TabsContent value="jackpot">
            <JackpotDraw />
          </TabsContent>
          <TabsContent value="configuration">
            <JackpotConfig />
          </TabsContent>
        </Tabs>
    </AppContent>
  )
}


export default JackpotSetting