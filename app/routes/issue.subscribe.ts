import { Issue } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { eventStream } from "remix-utils";
import { getCurrentUser } from "~/auth/services/getCurrentUser";
import { emitter } from "~/emitter.server";

export async function loader({ request }: LoaderArgs) {
  return eventStream(request.signal, function setup(send) {
    function handle() {
      send({
        event: "issue",
        data: "123",
      });
    }
    emitter.on("issue", handle);

    return function clear() {
      emitter.off("issue", handle);
    };
  });
}
