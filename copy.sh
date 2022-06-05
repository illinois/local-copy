#!/bin/bash

SRC_PATH="$INPUT_SRC_PATH"
DST_PATH="$INPUT_DST_PATH"
FROM="$INPUT_FROM"
TO="$INPUT_TO"

# Add terminal forward slashes if they don't exist in SRC_PATH and DST_PATH
if [ ! -z "$SRC_PATH" ] && [ "${SRC_PATH: -1}" != "/" ]; then
    SRC_PATH="$SRC_PATH/"
fi
if [ ! -z "$DST_PATH" -a "${DST_PATH: -1}" != "/" ]; then
    DST_PATH="$DST_PATH/"
fi

# Trim any leading, trailing, and intermediate whitespace from `from` and `to`
FROM="$(echo -e "${FROM}" | tr -d '[:space:]')"
TO="$(echo -e "${TO}" | tr -d '[:space:]')"

# Tokenize FROM and TO
IFS=',' 
read -r -a FROM_ARRAY <<< "$FROM"
read -r -a TO_ARRAY <<< "$TO"

if [ "${#FROM_ARRAY[@]}" -ne "${#TO_ARRAY[@]}" ]; then
    echo "Environment variables \"from\" and \"to\" do not share the same length. Exiting..."
    exit 1
fi

for i in "${!FROM_ARRAY[@]}"; do
	printf "Copying \"${FROM_ARRAY[i]}\" to \"${TO_ARRAY[i]}\"...\n"
	cp -rf "$SRC_PATH${FROM_ARRAY[i]}" "$DST_PATH${TO_ARRAY[i]}"
	ec=$?
	if [ $ec -ne 0 ]; then
		echo "ERROR: cp returned non-zero exit code $ec. Exiting..."
		exit 1
	fi
done
