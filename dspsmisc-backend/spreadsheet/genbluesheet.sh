
HOST=10.3.105.175:27017
DB=dspsmisc
COLLECTION=bluesheets
FIELD_FILE=bluesheet_fieldNames.txt

# TODO: generate year, mon, day 
OUT_FILE_STEP1=bluesheet-2010-09-21.step1.csv

OUT_FILE=bluesheet-2010-09-21.csv

mongoexport --host="${HOST}" --db="${DB}" --collection="${COLLECTION}" --type=csv  --fieldFile="${FIELD_FILE}"  --out="${OUT_FILE_STEP1}"

# multiple sed commands, separated by semi colon
sed 's/formWithLatestHistory.//g; s/\.val\b//g' < ${OUT_FILE_STEP1} > ${OUT_FILE}