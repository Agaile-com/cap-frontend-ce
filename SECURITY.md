# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of CAP Frontend seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- security@agaile.com

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### Required Information

Please include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Affected browsers and versions
- Potential impact of the vulnerability
- Any possible mitigations you've identified

### Frontend-Specific Concerns

When reporting frontend vulnerabilities, please also include:
- Client-side impact (XSS, CSRF, etc.)
- Affected components or routes
- Browser console output/errors
- Network request details if relevant
- Screenshots or recordings demonstrating the vulnerability

## Security Best Practices

Our frontend development follows these security principles:
- All user input is properly sanitized
- CSRF tokens are implemented for forms
- Content Security Policy (CSP) headers are properly configured
- Regular security audits of dependencies
- Secure cookie handling
- Protected API endpoints

## Disclosure Policy

- Security issues are treated as top priority
- Fixes are thoroughly tested to ensure no regressions
- Security patches are released as soon as possible
- Users are notified through our security advisory system

## Comments on Security Release Process

We follow the principle of [Responsible Disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure):
1. Security report received and assigned to a primary handler
2. Problem is confirmed and list of affected versions determined
3. Code audit to find any similar problems
4. Fixes prepared for all supported versions
5. Patches released and notifications sent to users
