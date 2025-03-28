sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'studentapp/students/test/integration/FirstJourney',
		'studentapp/students/test/integration/pages/StudentSRVList',
		'studentapp/students/test/integration/pages/StudentSRVObjectPage'
    ],
    function(JourneyRunner, opaJourney, StudentSRVList, StudentSRVObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('studentapp/students') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheStudentSRVList: StudentSRVList,
					onTheStudentSRVObjectPage: StudentSRVObjectPage
                }
            },
            opaJourney.run
        );
    }
);