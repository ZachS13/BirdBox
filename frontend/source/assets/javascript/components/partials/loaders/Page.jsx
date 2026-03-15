// IMPORTED STYLESHEETS
import "../../../../css/partials/loaders/page.css";

const Page = function ({ isViewLoading }) {
    return (
        <div className={`div-page-loader-modal-container${isViewLoading ? " active" : ""}`}>
            <div className="div-page-loader-modal">
                <div className="div-outer-spinning-container">
                    <div className="div-inner-spinning-container">
                        <ion-icon src="/media/icons/icon-logo.svg" />
                    </div>
                </div>
                <header className="header-page-loader-modal">
                    <h2>Getting things ready...</h2>
                    <p>Please wait while we fetch the requested view.</p>
                </header>
            </div>
        </div>
    );
};

export default Page;
