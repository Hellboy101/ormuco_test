function compareVersions(version1, version2) {
    const v1 = version1.split('.').map(Number);
    const v2 = version2.split('.').map(Number);
    const longerMap = v1.length > v2.length ? v1.length : v2.length;

    for (let i = 0; i < longerMap; i++) {
        if (v1[i] === undefined && (v2[i] !== undefined && v2[i] > 0)) {
            return "Version2 is greater than version1";
        }
        if (v2[i] === undefined && (v1[i] !== undefined && v1[i] > 0)) {
            return "Version1 is greater than version2";
        }
        if (v1[i] > v2[i]) {
            return "Version1 is greater than version2";
        }
        if (v1[i] < v2[i]) {
            return "Version2 is greater than version1";
        }
    }

    return "Both versions are equal";
}

// Test cases
console.log(compareVersions("1.2", "1.1")); // Expected output: Version1 is greater than version2
console.log(compareVersions("1.1", "1.2")); // Expected output: Version2 is greater than version1
console.log(compareVersions("1.2", "1.2")); // Expected output: Both versions are equal
console.log(compareVersions("1.2.0", "1.2")); // Expected output: Both versions are equal
console.log(compareVersions("1.2.0.1", "1.2")); // Expected output: Version1 is greater than version2
console.log(compareVersions("1.2.1", "1.2")); // Expected output: Version1 is greater than version2
console.log(compareVersions("1.2", "1.2.1")); // Expected output: Version2 is greater than version1
console.log(compareVersions("1.10", "1.2")); // Expected output: Version1 is greater than version2
console.log(compareVersions("2.0", "1.999.999")); // Expected output: Version1 is greater than version2