import { ValidatedForm } from "remix-validated-form";
import { userTypeList } from "~/users/types/user-type";
import { FormInput } from "./FormInput";
import { SubmitButton } from "./SubmitButton";
import { FormSelect } from "./FormSelect";
import { signinClientValidator } from "~/auth/validators/signin.validator";

export default function LoginForm() {
  return (
    <ValidatedForm validator={signinClientValidator} method="post">
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4">
          <FormInput name="username" label="username" />
          <FormInput name="password" label="password" type="password" />
          <FormSelect
            label="User Type"
            name="user_type"
            options={userTypeList}
          />
          <SubmitButton />
        </div>
      </div>
    </ValidatedForm>
  );
}
// export default function LoginForm() {
//   return (
//     <Form method="post">
//       <div className="flex h-screen justify-center items-center bg-gray-100">
//         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/4">
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="username"
//             >
//               Username
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               name="username"
//               type="text"
//               placeholder="Enter your username"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 text-sm font-bold mb-2"
//               htmlFor="userType"
//             >
//               User Type
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="userType"
//               name="user_type"
//             >
//               {userTypeList.map((userType) => (
//                 <option key={userType} value={userType}>
//                   {userType}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       </div>
//     </Form>
//   );
// }
