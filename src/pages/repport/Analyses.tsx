import AppContent from "@/components/Global/app-content"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnalysesDay from "./analyses-day"
import AnalysesMonth from "./analyses-month"

const Analyses = () => {
  
  return (
    <AppContent className="flex flex-col w-full h-full">
        <Tabs defaultValue="day" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="day">Jours</TabsTrigger>
            <TabsTrigger value="month">Mois</TabsTrigger>
          </TabsList>
          <TabsContent value="day">
            <AnalysesDay />
          </TabsContent>
          <TabsContent value="month">
            <AnalysesMonth />
          </TabsContent>
        </Tabs>
    </AppContent>
  )
}

export default Analyses