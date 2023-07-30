import { Issue } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { eventStream } from "remix-utils";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { emitter } from "~/emitter.server";

export async function loader({ request, params }: LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = user.id;
  const eventURL = `issue_assigned/${userId}`;

  return eventStream(request.signal, function setup(send) {
    function handle(issue: Issue) {
      if (issue.assignee_id === userId) {
        send({
          event: eventURL,
          data: issue.id,
        });
      }
    }
    emitter.on("issue_created", handle);

    return function clear() {
      emitter.off("issue_created", handle);
    };
  });
}
