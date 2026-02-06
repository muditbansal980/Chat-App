
import { useState } from "react";
import Uploadprofile from "./uploadprofile";
import Navbar from "../dashboardscomponents/Navbar";

export default function ProfilePage() {
    // parent owns the profileUrl state and passes it down via props
    const [profileUrl, setProfileUrl] = useState('/src/assets/profile.png');

    function handleUpdate(newUrl) {
        // in a real app you'd upload to server here and store the returned URL
        setProfileUrl(newUrl);
    }

    return (
        <div>
            {/* Navbar is rendered by the parent but Uploadprofile receives profile data via props only */}
            <Navbar />

            <main className="pt-[80px]"> {/* pad so navbar doesn't overlap when fixed */}
                <div className="max-w-[640px] mx-auto">
                    <h2 className="text-white text-xl mb-4">Profile (props demo)</h2>
                    <Uploadprofile profileUrl={profileUrl} onUpdate={handleUpdate} />

                    <div className="mt-4 text-white">
                        <div>Current profile URL:</div>
                        <div className="break-all">{profileUrl}</div>
                        <button
                            className="bg-white text-black mt-2 p-2 rounded"
                            onClick={() => setProfileUrl('/src/assets/profile.png')}
                        >
                            Reset to default
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
