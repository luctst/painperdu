import type { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/Card";
import { Input } from "../../ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "../../ui/Dropdown";
import { HelpCircle, CornerDownRight, LogIn } from "lucide-react";

import { createPortal } from "react-dom";

export const PainPerduShad: FC<{}> = () => {
  return createPortal(
    <>
      <div
        className="
				fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden
				bg-[rgba(0,0,0,.8)] opacity-80 outline-none focus:outline-none"
      ></div>
      <div className="relative inset-0 z-50 mx-auto my-0 mt-40 flex w-7/12 items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <Card className="w-[560px]">
          <CardHeader>
            <Input
              placeholder="Search for routes"
              type="search"
              autoFocus={true}
              autoComplete="off"
              spellCheck="false"
              enterKeyHint="search"
              maxLength={64}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </CardHeader>
          <CardContent>
            <div className="mb-12 flex-col pl-4 pt-8 text-center text-[#6c757d]">
              <div className="font-sans text-lg font-semibold">Non results</div>
            </div>
            <div className="flex items-center space-x-4 rounded-lg border border-primary p-4">
              <CornerDownRight color="hsl(var(--primary))"/>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-muted-foreground text-sm">
                  Send notifications to device.
                </p>
              </div>
              <LogIn color="hsl(var(--primary))"/>
            </div>
          </CardContent>
          <CardFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <HelpCircle className="h-6 w-6" color="hsl(var(--primary))" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Shortcuts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Open Pain Perdu</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </div>
    </>,
    document.querySelector("#popper-root")!,
  );
};
