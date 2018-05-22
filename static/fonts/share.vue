        <modal name="social-share"
            width="300px"
            height="200px"
            >
            <social-sharing :url="url"
                          :title="itinerary.title"
                          :description="itinerary.description"
                          hashtags="itirenary"
                          inline-template>
            <div>
                <network network="email">
                    <i class="fa fa-envelope"></i> Email
                </network>
                <network network="facebook">
                    <i class="fa fa-facebook"></i> Facebook
                </network>
                <network network="googleplus">
                    <i class="fa fa-google-plus"></i> Google +
                </network>
            </div>
            </social-sharing>
        </modal>
