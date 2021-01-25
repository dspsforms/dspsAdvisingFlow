
# HOST=10.3.105.175:27017
DB=dspsmisc
COLLECTION=bluesheets
FIELD_FILE=bluesheet_fieldNames.txt

# TODO: generate year, mon, day 
OUT_FILE_STEP1=bluesheet-test.step1.csv

OUT_FILE=bluesheet-test.csv

# cf https://stackoverflow.com/questions/36319052/use-mongoexport-with-a-query-for-isodate/36322337#36322337

# produce the following, with the value of the date supplied 
# { "created": {  "$gte": { "$date": "2020-07-30T00:00:00.001Z" } } }

DATE_TO_USE=2020-07-28T00:00:00.001Z

# outside single quote ensures that $ and double-quote are not interpreted by shell
QUERY='{ "created": {  "$gte": { "$date": "' 
QUERY+="${DATE_TO_USE}"
QUERY+='" } } }'

# echo query= $QUERY

# the double quote around ${QUERY} seems to be needed. not exactly sure why
mongoexport --db="${DB}" --collection="${COLLECTION}" \
 --query "${QUERY}" \
 --type=csv  --fieldFile="${FIELD_FILE}"  --out="${OUT_FILE_STEP1}"

# mongoexport --db="${DB}" --collection="${COLLECTION}" \
#  --query '{ "created": {  "$gte": { "$date": "2020-07-30T00:00:00.001Z" } } }' \
#  --type=csv  --fieldFile="${FIELD_FILE}"  --out="${OUT_FILE_STEP1}"


# multiple sed commands, separated by semi colon
# sed 's/formWithLatestHistory.//g; s/\.val\b//g' < ${OUT_FILE_STEP1} > ${OUT_FILE}