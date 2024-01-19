#!/bin/bash
# local - ./scripts/generate-certs.sh
# container - /usr/local/bin/generate-certs.sh
# This script generates the private key, certificate request, and certificate authority files
# https://www.mongodb.com/docs/manual/appendix/security/appendixA-openssl-ca/

CONF_DIR="/etc/ssl/"
OUTPUT_DIR="/var/ssl/"

# Recreate the output directory if it doesn't exist
rm -rf "$OUTPUT_DIR" && mkdir "$OUTPUT_DIR"

# add root permissions to output directory and config directory
chmod 777 "$OUTPUT_DIR" "$CONF_DIR"

# Create a private key
openssl genrsa -out "$OUTPUT_DIR/mongodb-test-ca.key" 4096

# Use the key to create a certificate request
openssl req -new -x509 -days 1826 -key "$OUTPUT_DIR/mongodb-test-ca.key" -out "$OUTPUT_DIR/mongodb-test-ca.crt" -config "$CONF_DIR/openssl-test-ca.cnf"

# This private key is used to generate valid certificates for the intermediate authority.
# Although this private key, like all files in this appendix, is intended for testing
# purposes only, you should engage in good security practices and secure this key file.
openssl genrsa -out "$OUTPUT_DIR/mongodb-test-ia.key" 4096

# The certificate request is signed by the test CA to create the intermediate authority certificate.
openssl req -new -key "$OUTPUT_DIR/mongodb-test-ia.key" -out "$OUTPUT_DIR/mongodb-test-ia.csr" -config "$CONF_DIR/openssl-test-ca.cnf"

# The intermediate authority certificate is used to sign the server certificate request.
openssl x509 -sha256 -req -days 730 -in "$OUTPUT_DIR/mongodb-test-ia.csr" -CA "$OUTPUT_DIR/mongodb-test-ca.crt" -CAkey "$OUTPUT_DIR/mongodb-test-ca.key" -set_serial 01 -out "$OUTPUT_DIR/mongodb-test-ia.crt" -extfile "$CONF_DIR/openssl-test-ca.cnf" -extensions v3_ca

# Created the test CA certificate bundle file and test intermediate authority certificate bundle file.
cat mongodb-test-ia.crt "$OUTPUT_DIR/mongodb-test-ca.crt" > "$OUTPUT_DIR/test-ca.pem"

# Print success message to user
echo "Private key, certificate request, and certificate authority files have been created in '$OUTPUT_DIR'."
