#!/bin/bash

rm testing/*chunk* ;
rm testing/output ;

echo ;
echo '-> Temporary files and testing files removed from testing directory' ;

npm start > testing/log.txt ;

echo 'Logs are here -> /testing/log.txt' ;
echo ;
echo ;

cat testing/output ;

