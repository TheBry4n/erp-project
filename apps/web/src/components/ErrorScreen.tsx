import { Button } from "./ui/button";

interface ErrorProps {
    errorObj: {
        statusCode: number;
        message: string;
    };
    onClose: () => void
}

export function ErrorScreen({ errorObj, onClose }: ErrorProps){
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg">
            <div className=" bg-gray-700 rounded-lg p-8">
              <div className="flex flex-col justify-center items-center p-8 gap-4">
                <h2 className="ml-2" >Error</h2>
                <p className="ml-2" >status code: {errorObj.statusCode}</p>
                <p className="ml-2" >message: {errorObj.message}</p>
                <Button onClick={() => onClose()} variant="destructive">Close</Button>
              </div>
            </div>
        </div>
    )
}