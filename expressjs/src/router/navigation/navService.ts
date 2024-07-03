// Copyright (c) 2024 phoi5675
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { navigationRepository } from "@/models/NavigationRepository";
import { Navigation } from "@/shared/types/models/Navigation";

class NavService {
  getNavItemsByUserId = async (
    userId: string
  ): Promise<Navigation[] | undefined> => {
    const navItems = await navigationRepository.findByUsername(userId);

    if (!navItems) {
      return;
    }
    return navItems;
  };
}

const navService = new NavService();

export { NavService, navService };
