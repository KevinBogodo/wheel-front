import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-5 h-5 p-3" size="icon">
          <Sun className="h-1 w-1 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-1 w-1 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Mode clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Mode Sombre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System (automatique)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
