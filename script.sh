#!/bin/bash

echo '  ________            ____  _          _______ __'
echo ' /_  __/ /_  ___     / __ )(_)___ _   / ____(_) /__'
echo '  / / / __ \/ _ \   / __  / / __ `/  / /_  / / / _ \'
echo ' / / / / / /  __/  / /_/ / / /_/ /  / __/ / / /  __/'
echo '/_/ /_/ /_/\___/  /_____/_/\__, /  /_/   /_/_/\___/'
echo '                          /____/'
echo '   _____            __  _'
echo '  / ___/____  _____/ /_(_)___  ____ _'
echo '  \__ \/ __ \/ ___/ __/ / __ \/ __ `/'
echo ' ___/ / /_/ / /  / /_/ / / / / /_/ /'
echo '/____/\____/_/   \__/_/_/ /_/\__, /'
echo '                            /____/'
echo '   ________          ____'
echo '  / ____/ /_  ____ _/ / /__  ____  ____ ____'
echo ' / /   / __ \/ __ `/ / / _ \/ __ \/ __ `/ _ \'
echo '/ /___/ / / / /_/ / / /  __/ / / / /_/ /  __/'
echo '\____/_/ /_/\__,_/_/_/\___/_/ /_/\__, /\___/'
echo '                                /____/'

#rm testing/*chunk* ;
#rm testing/output ;
#echo ' -> Temporary files and testing files removed from testing directory' ;

echo '' > testing/log.txt

npm start >> testing/log.txt ;

echo ' -> Logs are in /testing/log.txt' ;
echo ;
echo ;

sed -i 1,4d testing/log.txt ;

cat testing/output ;

