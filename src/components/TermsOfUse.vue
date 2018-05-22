<template>
    <div class="container">
        <main>
            <div class="header">
                <h2>Terms of User</h2>
                <h4>How to use PlanIt to benefit the community</h4>
            </div>
            <div class="questions">
                <h5>Terms</h5>
                <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trade mark law.</p>
            </div>
            <div class="questions">
                <h5>Use License</h5>
                <p>
                    1. Permission is granted to temporarily download one copy of the materials (information or software) on PlanIt's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    <ul>
                        <li>modify or copy the materials</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
                        <li>attempt to decompile or reverse engineer any software contained on PlanIt's website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                </p>
                <p>2. This license shall automatically terminate if you violate any of these restrictions and may be terminated by PlanIt at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>
            </div>
            <div class="questions">
                <h5>Disclaimer</h5>
                <p>The materials on PlanIt's website are provided "as is." PlanIt makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, PlanIt does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.</p>
            </div>
            <div class="questions">
                <h5>Limitations</h5>
                <p>In no event shall PlanIt or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on PlanIt's Internet site, even if PlanIt or a PlanIt authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
            </div>
            <div class="questions">
                <h5>Revisions and Errata</h5>
                <p>The materials appearing on PlanIt's website could include technical, typographical, or photographic errors. PlanIt does not warrant that any of the materials on its website are accurate, complete, or current. PlanIt may make changes to the materials contained on its website at any time without notice. PlanIt does not, however, make any commitment to update the materials.</p>
            </div>
            <div class="questions">
                <h5>Links</h5>
                <p>PlanIt has not reviewed all of the sites linked to its Internet website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PlanIt of the site. Use of any such linked website is at the user's own risk.</p>
            </div>
            <div class="questions">
                <h5>Site Terms of Use Modifications</h5>
                <p>PlanIt may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p>
            </div>
            <div class="questions">
                <h5>Governing Law</h5>
                <p>Any claim relating to PlanIt's website shall be governed by the laws of the Philippines without regard to its conflict of law provisions.</p>
                <p>General Terms and Conditions applicable to Use of a website.</p>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    name: 'termsofuse'
}
</script>

<style scoped>
.container {
    width: 100%;
    background-color: #0d2e3e;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
main {
    width: 80%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 70px;
}
main .header {
    padding-top: 70px;
    text-align: center;
}
main .header h2 {
    font-size: 32px;
    font-family: "Georgia";
}
main .header h4 {
    font-size: 22px;
    font-family: "Avenir";
    color: rgba(0, 0, 0, .5);
    font-weight: 500;
}
main .questions {
    font-family: "Avenir";
    width: 70%;
    margin: 20px 0px;
}
main .questions h5 {
    font-size: 20px;
    margin: 5px 0px;
    color: #f39c12;
}
main .questions p {
    font-size: 18px;
    line-height: 20px;
    text-align: justify;
    margin-top: 10px;
}
</style>
