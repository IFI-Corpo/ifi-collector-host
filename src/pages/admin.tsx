import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

export default function admin() {
  return (
    <div className="container text-center mx-auto mt-10">
      <h1 className="text-xl mb-5">API Recovery Entry</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Recovery Set 1</AccordionTrigger>
          <AccordionContent className="space-y-2 m-2">
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Youtube API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Gemini API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Instagram API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Twitter API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Recovery Set 2</AccordionTrigger>
          <AccordionContent className="space-y-2 m-2">
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Youtube API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Gemini API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Instagram API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Twitter API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Recovery Set 3</AccordionTrigger>
          <AccordionContent className="space-y-2 m-2">
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Youtube API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Gemini API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Instagram API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
            <div className="flex gap-2 *:not-first:mt-2 flex-row justify-center items-center">
              <Input
                className="flex-1 w-[250px]"
                placeholder="Twitter API Entry"
                type="text"
              />
              <Button className="h-[36px]" variant="outline">
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
