import plugin from "eslint-plugin-sonarjs"

/** @type {import("@eslint/config-helpers").Config} */
export const sonarjsAws = {
    plugins: {
        sonarjs: plugin,
    },
    rules: {
        "sonarjs/aws-apigateway-public-api": "error",
        "sonarjs/aws-ec2-rds-dms-public": "error",
        "sonarjs/aws-ec2-unencrypted-ebs-volume": "error",
        "sonarjs/aws-efs-unencrypted": "error",
        "sonarjs/aws-iam-all-privileges": "error",
        "sonarjs/aws-iam-all-resources-accessible": "error",
        "sonarjs/aws-iam-privilege-escalation": "error",
        "sonarjs/aws-iam-public-access": "error",
        "sonarjs/aws-opensearchservice-domain": "error",
        "sonarjs/aws-rds-unencrypted-databases": "error",
        "sonarjs/aws-s3-bucket-granted-access": "error",
        "sonarjs/aws-s3-bucket-insecure-http": "error",
        "sonarjs/aws-s3-bucket-public-access": "error",
        "sonarjs/aws-s3-bucket-versioning": "error",
        "sonarjs/aws-sagemaker-unencrypted-notebook": "error",
        "sonarjs/aws-sns-unencrypted-topics": "error",
        "sonarjs/aws-sqs-unencrypted-queue": "error",
    },
}
