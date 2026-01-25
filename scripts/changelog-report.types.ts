export type OutdatedPackageType = {
    current: string
    latest: string
    name: string
}

export type NpmRegistryResponseType = {
    repository?: {
        url?: string
    }
}

export type GitHubReleaseType = {
    body: string
    name: string
    published_at: string
    tag_name: string
}

export type PackageChangelogType = {
    changelog: string
    current: string
    latest: string
    name: string
}

export type NpmOutdatedEntryType = {
    current: string
    latest: string
    wanted: string
}

export type NpmOutdatedOutputType = Record<string, NpmOutdatedEntryType>
