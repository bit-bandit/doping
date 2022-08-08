/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { configuration } from "../config.ts"

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const jd = await Deno.readTextFile('./dump.json');
    const body = JSON.parse(jd);
    return ctx.render(body);
  },
};


function CompUp(props: any) {
  return (
    <div class={tw`flex shadow-md items-center p-4 place-content-between rounded-xl max-h-18 mx-auto my-2`}>
      <div class={tw`flex center`}>
        <p class={tw`text-xl text-blue-400`}>⬤</p>
        <p class={tw`text-xl mx-7`}>{props.name}</p>
        <div>
          <span
            class={tw`-mx-4 py-1 px-2.5 rounded-full font-serif font-black items-center bg-gray-200`}
            title={props.tooltip}
          >
            i
          </span>
        </div>
      </div>
      <p class={tw`italic text-gray-500 text-xs`}>Operational</p>
    </div>
  );
}

// Component for down websites
function CompDown(props: any) {
  let d = new Date(props.date);
  return (
    <div
      class={tw`flex shadow-md items-center p-4 place-content-between rounded-xl max-h-18 mx-auto my-2`}
    >
      <div class={tw`flex`}>
        <p class={tw`text-xl text-red-500`}>⬤</p>
        <p class={tw`text-xl mx-7`}>{props.name}</p>
        <div>
          <span
            class={tw`-mx-4 py-1 px-2.5 rounded-full font-serif font-black items-center bg-gray-200`}
            title={props.tooltip}
          >
            i
          </span>
        </div>
      </div>
      <div class={tw`text-xs italic leading-tight text-right text-gray-500`}>
        <p>Down since</p>
        <p>{d.toUTCString()}</p>
      </div>
    </div>
  );
}

export default function Main(data: any) {
  const body = data.data // Why god
  return (
    <div class={tw`max-w-xl m-auto`}>
      <nav class={tw`px-2 sm:px-4 py-2.5`}>
        <div
          class={tw`container flex flex-wrap justify-between items-center mx-auto`}
        >
          <a href={configuration.homeURL} class={tw`flex items-center`}>
            <img src={configuration.logo} class={tw`mr-3 h-6 sm:h-9`} />
            <span
              class={tw`self-center text-xl font-semibold whitespace-nowrap`}
            >
              {configuration.name}
            </span>
          </a>
        </div>
      </nav>
      <div class={tw`shadow-xl p-7 rounded-xl max-w-lg m-auto`}>
        {body.map((x) => {
          if (!x.operational) {
            return (
              <CompDown name={x.name} tooltip={x.info} date={x.downsince}/>
            );
          }
          return (
            <CompUp name={x.name} tooltip={x.info} />
          );
        })}
      </div>
    </div>
  );
}
