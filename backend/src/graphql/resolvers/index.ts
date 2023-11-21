
import path from 'path'; 
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

const resolverArray = loadFilesSync(path.join(__dirname, './'));

const resolvers = mergeResolvers(resolverArray);

export default resolvers;

