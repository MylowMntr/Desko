import { createFileRoute } from "@tanstack/react-router";
import { Button } from "src/components/ui/button";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">
                Bienvenue sur MylowDesk 🚀
            </h1>
            <Button>Essaye-moi !</Button>
        </main>
    );
}
