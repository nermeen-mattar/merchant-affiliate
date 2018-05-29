#!/bin/bash

#####################################
# @author Tobias Trusch
# @date 2018-04-08
#####################################

function extract_param() {
	echo $1 | sed 's/[-a-zA-Z0-9]*=//'
}

function line_break() {
	echo
	echo "===================================================================================="
	echo
}

function contains() {
	PROFILES="dev test prod"
	[[ ${PROFILES} =~ (^|[[:space:]])$1($|[[:space:]]) ]] && echo "true" || echo "false"
}

function lowerCase() {
	echo $1 | tr '[:upper:]' '[:lower:]'
}

#builds
function cleanup() {
	if [ -d dist ]; then echo "rm -rf dist" && rm -rf dist; fi
	if [ -e app.tar.gz ]; then echo "rm app.tar.gz" && rm app.tar.gz; fi
}

SCRIPT_NAME='deploy-frontend.sh'
TIMESTAMP=`date "+%Y%m%d%H%M%S"`

#Script Start
echo "Start scriplet '${SCRIPT_NAME}'..."


#Define default variables
TC=team.center
TC_USER=root
TC_KEY_FILE=tc-keyfile
TC_HOMEDIR=/var/www/html
TC_APP_DIR=app_deployed
PROFILE=dev

#Overwrite predefined variables
for i in $*
do
	case $i in
		-server=*)
			TMP_PROFILE=`extract_param $i`
			if [ `contains "TMP_PROFILE"` == "true" ]
			then
				PROFILE=${TMP_PROFILE}
				echo "Using profile ${TMP_PROFILE}"
			else
				echo "The ${TMP_PROFILE} is not valid profile. Using profile dev."
			fi
			;;
		-host=*)
			TC=`extract_param $i`
			echo "Overwrite default host with: ${TC}"
			;;
		-user=*)
			TC_USER=`extract_param $i`
			echo "Overwrite default user with: ${TC_USER}"
			;;
		-keyfile=*)
			TC_KEY_FILE=`extract_param $i`
			echo "Overwrite default key file with: ${TC_KEY_FILE}"
			;;
		-homedir=*)
			TC_HOMEDIR=`extract_param $i`
			echo "Overwrite default home directory with: ${TC_HOMEDIR}"
			;;
		-appdir=*)
			TC_APP_DIR=`extract_param $i`
			echo "Overwrite default temporary application directory with: ${TC_APP_DIR}"
			;;
		-service=*)
			SERVICE=`extract_param $i`
			echo "Overwrite default service name with: ${SERVICE}"
			;;
	esac
done
echo "Starting deployment using PROFILE = ${PROFILE}"

#Setting variables depending on profileTC_APP_DIR=app_deployed
TC_APP_DIR="${TC_APP_DIR}/${PROFILE}"

cleanup

if [ "${PROFILE}" == "prod" ]
then
	HOST="http://team.center"
else
	HOST="http://${PROFILE}.team.center"
fi

#Build project
BUILD_OUTPUT="build.output"
echo "Starting build and save output in ${BUILD_OUTPUT}"
if [ "${PROFILE}" == "prod" ]
then
	echo "ng build -c production > ${BUILD_OUTPUT}"
	ng build -c production > ${BUILD_OUTPUT}
elif [ "${PROFILE}" == "dev" ]
then
	echo "ng build -c devopt > ${BUILD_OUTPUT}"
	ng build -c devopt > ${BUILD_OUTPUT}
elif [ "${PROFILE}" == "test" ]
then
	echo "ng build -c ${PROFILE} > ${BUILD_OUTPUT}"
	ng build -c ${PROFILE} > ${BUILD_OUTPUT}
fi

# tar dist folder
echo "Creating tar to transfer"
cd dist
tar -czf app.tar.gz * && cd .. && mv dist/app.tar.gz . && chmod 755 app.tar.gz


chmod 400 ${TC_KEY_FILE}
#Transfer artifact

#create backup
echo "Creating backup on server"
ssh -i ${TC_KEY_FILE} ${TC_USER}@${TC} "cd /var/www/html && mv ${PROFILE} app_deployed/${PROFILE}.${TIMESTAMP}.bkp && mkdir ${PROFILE}"
if [ $? -ne 0 ]
then
	echo "FAILED to backup on server"
	exit 1
fi

line_break


echo "Transfering files to remote server"
scp -i ${TC_KEY_FILE} -r app.tar.gz ${TC_USER}@${TC}:${TC_HOMEDIR}/${PROFILE}
if [ $? -ne 0 ]
then
	echo "FAILED to transfer files to server"
	exit 1
else
	echo "SUCCESSFULLY transfered to ${TC}:${TC_HOMEDIR}/${PROFILE}"
fi

echo "Untar files on remote server"
ssh -i ${TC_KEY_FILE} ${TC_USER}@${TC} "cd ${TC_HOMEDIR}/${PROFILE} && tar -xzf app.tar.gz && rm -rf app.tar.gz && cd .. && chmod -R 755 ${PROFILE} && chown -R root:root dev/ && exit"
if [ $? -ne 0 ]
then
	echo "FAILED to untar files on server"
	exit 1
else
	echo "SUCCESSFULLY deployed to ${TC}:${TC_HOMEDIR}/${PROFILE}"
fi

#Script Start
cleanup
echo "Script '${SCRIPT_NAME}' finished."
