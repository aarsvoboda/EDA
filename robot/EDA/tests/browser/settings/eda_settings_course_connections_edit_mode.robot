*** Settings ***

Resource        robot/EDA/resources/EDA.robot
Library         cumulusci.robotframework.PageObjects
...             robot/EDA/resources/CourseConnectionsSettingsPageObject.py

Suite Setup     Open Test Browser
Suite Teardown  Capture screenshot and delete records and close browser

Test Setup      Run keywords
...             Go to EDA settings tab          Course Connections      AND
...             Update enable cc to default

*** Test Cases ***
Validate Edit Mode For Course Connections, Settings
    [Documentation]     This test case validates the settings tab in course connections in edit mode
    ...                 Also validates the field values of Enable course connections, Default Active
    ...                 Student Record Type and Default Faculty Record Type are reatined upon saving
    ...                 which also includes the validation of fields in non edit mode.
    [tags]                                      unstable        W-041783                W-041784
    Click edit on EDA settings page
    Verify enable course connections warning    true
    Set enable course connections
    Verify enable course connections warning    false
    Verify dropdown values                      Default Active Student Record Type
    ...                                         Default
    ...                                         Faculty
    ...                                         Student
    Verify dropdown values                      Default Faculty Record Type
    ...                                         Default
    ...                                         Faculty
    ...                                         Student
    Click action button on EDA settings page    Cancel
    Click edit on EDA settings page
    Set enable course connections
    Update dropdown value
    ...                                         Default Active Student Record Type=Faculty
    ...                                         Default Faculty Record Type=Student
    Click action button on EDA settings page    Save
    Go to EDA settings tab                      Course Connections                      #This is a work around as we have consistent issues with fields visible to the user 
    Verify enable course connections            true
    Verify selected dropdown value
    ...                                         Default Active Student Record Type=Faculty
    ...                                         Default Faculty Record Type=Student
