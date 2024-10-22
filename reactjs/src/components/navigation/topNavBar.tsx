// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.

import Link from "next/link";

// https://opensource.org/licenses/MIT
export const NavigationBar = () => {
  return (
    <div>
      <Link href="/">Main</Link>
      <Link href="/about">About</Link>
      <Link href="/logout">Logout</Link>
    </div>
  );
};
