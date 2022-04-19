#!/bin/bash

# Header

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

# To Remove tmp files when testing the script

rm -rf tmp/ ;
mkdir tmp ;

# Run and log

npm start > log.txt ;

# Loading

echo -ne '####                   (20%)\r'
sleep 1
echo -ne '########               (40%)\r'
sleep 1
echo -ne '############           (60%)\r'
sleep 1
echo -ne '################       (80%)\r'
sleep 1
echo -ne '####################   (100%)\r'
echo ''

# Log success or error

if grep 'Error' tmp/log.txt ; then
{
	echo 'Wrong parameters, File inacessibe or Error during the merging process, more details there: /tmp/log.txt'
	exit 1 ;
}
else
{
	sed -i 1,4d log.txt ;
	echo 'Success, more details there: /tmp/log.txt' ;
	echo ''
	#more testing/output ;
}
fi

# Remove unremoved tempo files

rm -rf tmp/