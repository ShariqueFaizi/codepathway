import { useState } from "react";
import Navbar from "@/react-app/components/layout/Navbar";
import Footer from "@/react-app/components/layout/Footer";
import { Button } from "@/react-app/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/react-app/components/ui/select";
import { postJson } from "@/react-app/lib/api";

export default function Playground() {
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running...");
    try {
      const result = await postJson<{ output: string }>("/api/execute", { code, language });
      setOutput(result.output);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Code Playground</h1>
          <p className="text-lg text-muted-foreground">Experiment with algorithms and data structures in different languages.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Code</h2>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-96 border border-border rounded-xl">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-transparent resize-none focus:outline-none font-mono"
                placeholder="// Start coding..."
              />
            </div>
            <Button onClick={handleRunCode} disabled={isRunning}>
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Output</h2>
            <div className="h-96 border border-border rounded-xl bg-[#0d1117]">
              <pre className="w-full h-full p-4 text-sm whitespace-pre-wrap overflow-auto font-mono">
                {output}
              </pre>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
