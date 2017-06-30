rm -rf **/node_modules
rm -rf **/dist

cd api
cd ./app-data-contracts
npm install
tsc

cd ../app-data
npm install
tsc

cd ../hapi-api
npm install
tsc

