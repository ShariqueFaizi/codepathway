import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { postJson } from '@/react-app/lib/api';

interface CodeSandboxProps {
  starterCode: {
    javascript?: string;
    python?: string;
    java?: string;
  };
  testCases: {
    id: number;
    input: string;
    expected_output: string;
    is_hidden: boolean;
  }[];
}

interface ExecutionResponse {
  output: string;
  testResults: any[];
}

export default function CodeSandbox({ starterCode, testCases }: CodeSandboxProps) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(starterCode.javascript || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    const newCode = starterCode[language as keyof typeof starterCode] || '';
    setCode(newCode);
  }, [language, starterCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    setTestResults([]);

    try {
      const result = await postJson<ExecutionResponse>('/api/execute', { 
        code, 
        language, 
      });
      setOutput(result.output);
      // The backend should return test results in the final implementation
      // For now, we'll continue to use dummy data.
      setTestResults([
        { input: testCases[0].input, expected: testCases[0].expected_output, actual: '[0, 1]', pass: true },
        { input: testCases[1].input, expected: testCases[1].expected_output, actual: '[1, 2]', pass: true },
      ]);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="border border-border rounded-xl my-8">
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h3 className="text-lg font-semibold">Code Editor</h3>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-96">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-4 bg-transparent resize-none focus:outline-none font-mono"
          placeholder="// Start coding..."
        />
      </div>
      <div className="p-4 border-t border-border">
        <Button onClick={handleRunCode} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Code'}
        </Button>
      </div>
      <div className="border-t border-border">
        <Tabs defaultValue="output">
          <TabsList className="p-4">
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
          </TabsList>
          <TabsContent value="output" className="p-4 bg-[#0d1117]">
            <pre className="text-sm whitespace-pre-wrap overflow-auto font-mono">
              {output}
            </pre>
          </TabsContent>
          <TabsContent value="test-cases" className="p-4 bg-[#0d1117]">
            <div className="flex flex-col gap-4">
              {testResults.map((result, index) => (
                <div key={index} className="border border-border p-4 rounded-lg">
                  <p className={`font-semibold ${result.pass ? 'text-green-500' : 'text-red-500'}`}>
                    Test Case #{index + 1}: {result.pass ? 'Passed' : 'Failed'}
                  </p>
                  <p><span className="font-semibold">Input:</span> {result.input}</p>
                  <p><span className="font-semibold">Expected:</span> {result.expected}</p>
                  <p><span className="font-semibold">Actual:</span> {result.actual}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
