import { getUserData } from '../../lib/jwt';

import {
 IUser,
 ICreateUserInput,
 IModels,
 ILoginInput,
 IAuthPayLoad
} from '../../types';



import { doLogin, getUserBy } from '../../lib/auth';

export default {
 Query: {
  getUsers: (
   _: any, args: any,
   { models }: { models: IModels }
  ): IUser[] => models.User.findAll(),
  getUserData: async (
   _: any,
   { at }: { at: string },
   { models }: { models: IModels }
  ): Promise<any> => {
   // Get current connected User 
   const connectedUser = await getUserData(at);

   if (connectedUser) {
    // validate if the user is still valid 
    const user = await getUserBy({
     id: connectedUser.id,
     email: connectedUser.email,
     privilege: connectedUser.privilege,
     active: connectedUser.active
    },
     models
    )
    if (user) {
     return connectedUser;
    }
   }

   return {
    id: '',
    username: '',
    password: '',
    email: '',
    privilege: '',
    active: false
   }
  }
 },

 Mutation: {
  createUser: (_: any,
   { input }: { input: ICreateUserInput },
   { models }: { models: IModels }): IUser => models.create({ ...input }),

  login: (_: any,
   { input }: { input: ILoginInput },
   { models }: { models: IModels }
  ): Promise<IAuthPayLoad> => doLogin(input.email, input.password, models)
 }
};