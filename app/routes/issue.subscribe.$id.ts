import { Issue } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { eventStream } from "remix-utils";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { emitter } from "~/emitter.server";
import { IssueEvent } from "~/issue/types/issue.types";

export async function loader({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);
  if (!user || user.id !== params.id) {
    console.log("No user");
    return null;
  }
  const event_url = `${IssueEvent.issue_created + "/" + params.id}`;
  return eventStream(request.signal, function setup(send) {
    function handle(issue_reporter: string) {
      const date = new Date().toISOString();
      send({
        event: "new-issue",
        data: `Issue Assigned to you by ${issue_reporter} at ${date}`,
      });
    }
    emitter.on(event_url, handle);

    return function clear() {
      emitter.off(event_url, handle);
    };
  });
}
