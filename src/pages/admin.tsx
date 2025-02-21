import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function admin() {
  return (
    <div className="flex flex-col justify-center items-center text-center h-[50vh] space-y-2">
      <h1 className="text-xl mb-5">Info Recovery Entry</h1>
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
    </div>
  );
}
