FROM java:8
ENV DEBIAN_FRONTEND noninteractive
# Dependencies
RUN dpkg --add-architecture i386 && apt-get update && apt-get install -yq libsdl1.2debian:i386 zlib1g:i386 libncurses5:i386 ant maven --no-install-recommends
ENV GRADLE_URL http://services.gradle.org/distributions/gradle-2.2.1-all.zip
RUN curl -L ${GRADLE_URL} -o /tmp/gradle-2.2.1-all.zip && unzip /tmp/gradle-2.2.1-all.zip -d /usr/local && rm /tmp/gradle-2.2.1-all.zip
ENV GRADLE_HOME /usr/local/gradle-2.2.1
# Download and untar SDK
ENV ANDROID_SDK_URL http://dl.google.com/android/android-sdk_r24.1.2-linux.tgz
RUN curl -L "${ANDROID_SDK_URL}" | tar --no-same-owner -xz -C /usr/local
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV ANDROID_SDK /usr/local/android-sdk-linux
ENV PATH ${ANDROID_HOME}/tools:$ANDROID_HOME/platform-tools:$PATH