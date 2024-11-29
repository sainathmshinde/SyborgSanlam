import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FileUpload() {
  return (
    <Card className="">
      <CardContent>
        <div className="grid gap-4 mt-5">
          <div className="group relative flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900">
            <div className="pointer-events-none z-10 flex flex-col items-center justify-center space-y-2 text-center text-gray-500 transition-colors group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
              <UploadIcon className="h-8 w-8" />
              <p className="text-sm font-medium">
                Drag and drop a file, or click to select a file
              </p>
            </div>
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <div className="hidden space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileIcon className="h-5 w-5 text-gray-500" />
                <p className="text-sm font-medium">filename.pdf</p>
              </div>
              <p className="text-sm text-gray-500">2.5 MB</p>
            </div>
            <Button type="submit" className="w-full">
              Upload File
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
